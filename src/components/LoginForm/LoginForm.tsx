import React, {useState} from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useLoginMutation} from "../../app/api";
import {setToken} from "../../features/auth/authSlice";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import {Visibility, VisibilityOff} from "@mui/icons-material";

interface IFormInput {
    email: string;
    password: string;
}

const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const LoginForm: React.FC = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<IFormInput>({
        resolver: yupResolver(validationSchema),
    });
    const [loginUser, {isLoading}] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginError, setLoginError] = useState<string | null>(null);

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            const result = await loginUser(data).unwrap();
            if (result.accessToken) {
                dispatch(setToken(result.accessToken)); // Сохранение токена в Redux
                navigate('/');
            } else {
                setLoginError('Login or password is incorrect');
            }
        } catch (err) {
            setLoginError('Something went wrong');
        }
    };
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 1}}>
                    <TextField
                        {...register("email")}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        {...register("password")}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        inputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>

                        }}
                        autoComplete="current-password"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    {loginError && (
                        <Typography color="error" sx={{mt: 2}}>
                            {loginError}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </Button>
                </Box>
            </Box>
        </Container>
    )
        ;
};

export default LoginForm;
