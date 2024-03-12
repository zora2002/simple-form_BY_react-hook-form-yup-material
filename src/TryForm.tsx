import { useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"

import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import KeyIcon from "@mui/icons-material/Key"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"

interface IFormInput {
  account: string
  password: string
}

const validate = yup.object({
  account: yup.string().required("請輸入信箱").email("信箱格式錯誤"),
  password: yup
    .string()
    .required("請輸入密碼")
    .min(8, "密碼至少8個字，不超過20個字")
    .max(20, "密碼至少8個字，不超過20個字"),
})

const handleForgetClick = () => {
  console.log("忘記密碼")
}

const loginSubmit: SubmitHandler<IFormInput> = (submitData) => {
  console.log(submitData)
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validate),
    defaultValues: {
      account: "",
      password: "",
    },
  })
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    errors.account && console.log(errors.account?.message)
    errors.password && console.log(errors.password?.message)
  }, [errors])

  return (
    <>
      <CssBaseline />
      <Grid
        container
        sx={{
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
          background: (theme) =>
            `linear-gradient(${theme.palette.primary.light},${theme.palette.secondary.light})`,
        }}
      >
        <Grid item xs={6} md={6} sx={{ mt: "100px" }}>
          <Paper sx={{ padding: "40px" }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={12}>
                <form onSubmit={handleSubmit(loginSubmit)}>
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                          <TextField
                            id="search-account"
                            label="信箱"
                            // 未註解的話，先輸入222再按登入，沒有跳紅字提示
                            // type="email"
                            variant="outlined"
                            fullWidth
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <AccountCircleIcon />
                                </InputAdornment>
                              ),
                            }}
                            {...register("account")}
                            error={!!errors?.account}
                            helperText={errors?.account?.message as string}
                          />
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <TextField
                            id="search-password"
                            label="密碼"
                            type={showPassword ? "text" : "password"}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <KeyIcon />
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() =>
                                      setShowPassword((show) => !show)
                                    }
                                    edge="end"
                                  >
                                    {showPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                            defaultValue={""}
                            {...register("password")}
                            error={!!errors?.password}
                            helperText={errors?.password?.message as string}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Grid container spacing={1}>
                        <Grid item xs={6} md={6}>
                          <Button
                            variant="contained"
                            fullWidth
                            onClick={handleForgetClick}
                          >
                            忘記密碼
                          </Button>
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <Button type="submit" variant="contained" fullWidth>
                            登入
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default Login
