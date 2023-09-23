import React from 'react';
import { Text } from '../../Components';
import { Button, Form, Input, Card } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'


interface RegisterPage {
    fullName: string;
    email: string;
    username: string;
    password:string;
}

const initialValues = {
    fullName: '',
    email: '',
    username:'',
    password:''
}

const validationSchema = yup.object({
    fullName: yup
        .string()
        .required("The Full Name field is required"),
    email: yup
        .string()
        .email("Enter Valid Email Address")
        .required("The email must be a valid email address"),
    username: yup
        .string()
        .required("The Username Field is required"),
    password: yup
        .string()
        .required("The Password Field is required")
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "The Password must be exactly 8 characters long, must contain at least one letter, one number and one special character"
        ),
})

const RegisterForm: React.FC = () => {
    const navigate = useNavigate()

    const handleSubmit = (values: RegisterPage) => {
        const body = {
            fullname: values.fullName,
            email: values.email,
            username: values.username,
            password: values.password,
    };

    fetch('https://mock-api.arikmpt.com/api/user/register', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
        .then((response) => {
        if (!response.ok) {
            throw new Error('Error while register');
        }
        return response.json();
        })
        .then((data) => {
        console.log('Success register:', data);
        Swal.fire({
            icon: 'success',
            title: 'Registration Success',
            text: 'Registration Success',
        });
            navigate('/dashboard'); 
        })
        .catch((error) => {
            console.log(error);
            Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: 'An error occurred during registration. Please try again.',
        });
        });
    };

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: handleSubmit,
        validationSchema: validationSchema
    })

    const handleRegister = () => {
        formik.validateForm().then(() => {
        if (Object.keys(formik.errors).length === 0) {
            formik.handleSubmit();
        }
        });
    };

    // const handleLogin = () => {
    //     navigate('/login');
    // };


return (
    <Card title="Register Page" style={{width: "400px"}}>
    <Form
        style={{ maxWidth: 600 }}
        name="register_page"
        className='register'
        initialValues={{ remember: true }}
        onFinish={formik.handleSubmit}
    >
    <div id='fullname-div'>
    <Input
    placeholder="Full Name"
    value={formik.values.fullName}
    onChange={formik.handleChange('fullName')}
    status={formik.errors.fullName && 'error'} />
    </div>
    
    <Form.Item>
        {formik.errors.fullName && (
            <Text >{formik.errors.fullName}</Text>
        )}
    </Form.Item>

    <div id='email-div'>
    <Input
    placeholder="Email Address"
    value={formik.values.email}
    onChange={formik.handleChange('email')}
    status={formik.errors.email && 'error'} />
    </div>

    <Form.Item>
        {formik.errors.email && (
            <Text >{formik.errors.email}</Text>
        )}
        </Form.Item>
    
    <div id='username-div'>
    <Input
    placeholder="Username"
    value={formik.values.username}
    onChange={formik.handleChange('username')}
    status={formik.errors.username && 'error'} />
    </div>

    <Form.Item>
        {formik.errors.username && (
            <Text >{formik.errors.username}</Text>
        )}
    </Form.Item>

    <div id='password-div'>
    <Input
    type="password"
    placeholder="Password"
    value={formik.values.password}
    onChange={formik.handleChange('password')}
    status={formik.errors.password && 'error'} />
    </div>

    <Form.Item>
        {formik.errors.password && (
            <Text >{formik.errors.password}</Text>
        )}
    </Form.Item>
    
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
    <Button type="primary" htmlType="button" onClick={handleRegister} style={{ margin: '12px'}} >
        Register
    </Button>
    {/* <Button type="primary" htmlType="button" onClick={handleLogin} >
        Login
    </Button> */}
    </Form.Item>
</Form>
</Card>
)
};

export default RegisterForm;