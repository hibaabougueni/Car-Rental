import {React, useState, useEffect} from 'react';
import './navbarStyle.css';
import CategoryService from "../../services/CategoryService";
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PhoneIcon from '@mui/icons-material/Phone';
import { Button, Grid, TextField, Typography, Avatar, InputAdornment } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import UserService from '../../services/UserService';
import { GoogleLogin } from 'react-google-login';


const Navigationbar = ({onCartClick}) => {
    const clientId="595746754776-t10gmkvsaldgap227640jm81ku6mr5bv.apps.googleusercontent.com";

    const token=localStorage.getItem("token");
    const navigate=useNavigate();
    
    useEffect(()=>{
        if(token){
          UserService.getUser(token)
          .then(response => {
            
            console.log(response.data);
        })
        .catch(error => {
            
            console.error("Error fetching user data", error);
        });
        }
    },[token]);
      

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSignUp = () => {
        AuthService.register(formData)
            .then(response => {
                alert("User successfully registered");
                //handleClose();
                setOpen(false);
                navigate("/");
            })
            .catch(error => {
                alert("Error registering user");
                console.error(error);
            });
    };


    const [loginData, setLoginData]= useState({
        email:'',
        password:''
    });
    const handleChange2=(e)=>{
        const {name,value}=e.target;
        setLoginData({
            ...loginData,
            [name]:value
        });
    };
    const handleLoginin=()=>{
        AuthService.login(loginData)
        .then(res=>{
            alert("Login successful");
            const token=res.data.accessToken;
            console.log("Token", res.data.accessToken);
            localStorage.setItem("token", token);
            setOpen2(false);
            navigate("/");
        }).catch(error => {
            if (error.response && error.response.status === 401) {
                alert("Unauthorized: Please check your credentials.");
            } else {
                alert("Error logging in");
            }
            console.error(error);
        });
    };

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setOpen2(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [open2, setOpen2] = useState(false);

    const handleClickOpen2 = () => {
        setOpen2(true);
        setOpen(false);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    const [categories, setCategories]=useState([]);

    useEffect(()=>{
        CategoryService.findAll()
        .then(res=>{
            setCategories(res.data);
        }).catch(error=>{
            console.error("error", error);
        })
    }, [])

    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(prevState => !prevState);
    };


    const onSuccess=(res)=>{
        console.log("Login success! ", res.profileObj);
    }

    const onFailure=(res)=>{
        console.error("something went wrong, ", res);
    }

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        console.log('Toggling dropdown');
        setIsOpen(!isOpen);
    };

    
    const handleLogout=()=>{
        localStorage.removeItem("token");
        navigate("/");
    }

    return (<>
        <nav className="navbar">
            <div className="wrapper">
                <div className="logo">
                    <a href="/"><img src="src/assets/newlogo.png" alt="logo"  width="200px" height="130px" /></a>
                    <input type="radio" name="slide" id="menu-btn"/>
                    <input type="radio" name="slide" id="cancel-btn"/>
                </div>
                <ul  className={`nav-links ${menuOpen ? 'active' : ''}`}>
                    <button className="btn close-btn" onClick={toggleMenu}> 
                        <i className="fa fa-times"></i> 
                    </button>
                    <li><a href="/">Home</a></li>
                    <li><a href="/aboutus">About Us</a></li>
                    <li>
                    <a href="/vehicules" className="desktop-item">Vehicles</a>
                    <input type="checkbox" id="showMega"/>
                    <label htmlFor="showMega" className="mobile-item">Vehicles</label>

                        <div className="mega-box">
                            <div className="content">
                                
                                {categories.map((cat,index)=>(
                                <div className="row" key={index}>
                                    <header style={{color:"white"}}>{cat.name}</header>
                                    <ul className='mega-links'>
                                        <li>
                                            <Link to={`/vehicules/${cat.name}`}>
                                            <img src={cat.imgURL} alt="image category"/>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                ))}
                            </div>
                        </div>
                    </li>
                    <li><a href="/conditions">Rent Conditions</a></li>
                    <li><a href="/contactus">Contact Us</a></li>
                    <div className={`account-menu-container ${isOpen ? 'active' : ''}`}>
                        <li onClick={toggleDropdown} className="icon">
                            <AccountCircleIcon />
                        </li>
                        {/* Dropdown menu */}
                        {isOpen && (
                            <ul className="dropdown-menu">
                                <li><a href="/history">History</a></li>
                                <li><a onClick={handleClickOpen}>Sign in</a></li>
                                <li><a onClick={handleLogout}>Logout</a></li>
                            </ul>
                        )}
                    </div>
                    <li><a onClick={onCartClick} className="icon"><ShoppingCartIcon /></a></li>
                    
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            <Avatar sx={{width:"70px", height:"70px", margin:"0 auto"}}></Avatar>
                            <div style={{textAlign:"center", fontWeight:"500", fontSize:"30px", marginTop:"10px"}}>
                                SIGN UP
                            </div>
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                           <Grid container spacing={2}>
                                <Grid item xs={6} sm={6} md={6} sx={{margin:"10px 0"}}>
                                    <TextField
                                        required 
                                        fullWidth
                                        label="First Name"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={6} md={6} sx={{margin:"10px 0"}}>
                                    <TextField
                                        required 
                                        fullWidth
                                        label="Last Name"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} sx={{margin:"2px 0"}}>
                                    <TextField
                                        required 
                                        fullWidth
                                        label="Phone"
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PhoneIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} sx={{margin:"2px 0"}}>
                                    <TextField
                                        required 
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} sx={{margin:"2px 0"}}>
                                    <TextField
                                        type="password"
                                        required 
                                        fullWidth
                                        label="Password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} sx={{marginTop:"10px"}}>
                                    <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                                        <Button 
                                            variant="contained"
                                            sx={{borderRadius:"50px", padding:"10px 85px "}}
                                            onClick={handleSignUp}> 
                                            Signup
                                        </Button>
                                    </div>
                                    {/* <div>
                                        <GoogleLogin 
                                            clientId={clientId}
                                            buttonText="Sign up with Google"
                                            onSuccess={onSuccess}
                                            onFailure={onFailure}
                                            cookiePolicy={'single_host_origin'}
                                            //isSignedIn={true} 
                                        />   
                                    </div> */}
                                </Grid>

                                <div style={{margin:"13px auto"}}>
                                    <Link onClick={handleClickOpen2}> 
                                        Already have an account ? Connect here.
                                    </Link>
                                </div>
                           </Grid>

                        </DialogContentText>
                        </DialogContent>
                        
                    </Dialog>


                    <Dialog
                        open={open2}
                        onClose={handleClose2}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            <Avatar sx={{width:"70px", height:"70px", margin:"0 auto"}}></Avatar>
                            <div style={{textAlign:"center", fontWeight:"500", fontSize:"30px", marginTop:"10px"}}>
                                LOGIN
                            </div>
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                           <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={12} sx={{margin:"10px 15px 6px 15px"}}>
                                    <TextField
                                        required 
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        placeholder="Email"
                                        value={loginData.email}
                                        onChange={handleChange2}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} sx={{margin:"10px 15px 15px 15px"}}>
                                    <TextField
                                        type="password"
                                        required 
                                        fullWidth
                                        placeholder='Password'
                                        label="Password"
                                        name="password"
                                        value={loginData.password}
                                        onChange={handleChange2}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                                        <Button 
                                            variant="contained"
                                            sx={{borderRadius:"50px", padding:"10px 85px "}}
                                            onClick={handleLoginin}> 
                                            LogIn
                                        </Button>
                                    </div>

                                    {/* <div>
                                        <GoogleLogin 
                                            clientId={clientId}
                                            buttonText="login"
                                            onSuccess={onSuccess}
                                            onFailure={onFailure}
                                            cookiePolicy={'single_host_origin'}
                                            //isSignedIn={true} 
                                        />   
                                    </div> */}
                                </Grid>
                                <div style={{margin:"23px auto"}}>
                                    <Link onClick={handleClickOpen}> 
                                            You don't have an account ?
                                            Create one.
                                    </Link>
                                </div>
                                
                           </Grid>

                        </DialogContentText>
                        </DialogContent>
                    </Dialog>
                </ul>

            </div>
        </nav>
    </>);
}

export default Navigationbar;