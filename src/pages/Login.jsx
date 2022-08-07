import { useEffect, useState } from "react";
import AdminPage from "./Admin";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import userService from "../services/userService";
import { userLoginSuccess } from "../redux/user/userItemSlice";

const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState({});
    const history = useHistory('');
    const [content, setContent] = useState('');
    const [contentUsername, setContentUsername] = useState('');
    const [contentPassword, setContentPassword] = useState('');
    const [isValid, setIsValid] = useState(true);
    const dispatch = useDispatch();
    

    const checkLogin = async(e) => {
        e.preventDefault();
        let respone = await userService.handleLogin(username, password);
        if(respone && respone.errCode === 0) {
            let userInfo = respone.data;
            dispatch(userLoginSuccess({
                userInfo: userInfo
            }));
            setUser(respone.data);
            history.push('/admin-login-success');
        }else {
            setContentUsername('')
            setContentPassword('');
            setIsValid(true);
            setContent('');
            if(respone && respone.errCode === 1) {
                setIsValid(false);
                setContent(respone.errMessage);
            }else if(respone && respone.errCode === 2) {
                setContentUsername(respone.errMessage);
            }else if(respone && respone.errCode === 3) {
                setContentPassword(respone.errMessage);
            }else if(respone && respone.errCode === 4) {
                setContentPassword(respone.errMessage);
            }else if(respone && respone.errCode === 5) {
                setContentUsername(respone.errMessage);
            }
        }
    }

    useEffect(() => {
        setUser(user);
        setContentUsername('');
        setContentPassword('');
        setIsValid(true);
        setContent('');
    }, [user], [contentUsername], [contentPassword], [isValid], [content], [username], [password])


    return (
        <div className="login-page-container">
            <form action="" method="POST" className="form" id="form-1">
                <h3 className="heading">Đăng nhập</h3>
                <p className="desc">Đăng nhập tài khoản YOLO ❤️</p>
            
                <div className="spacer"></div>
            
                <div className={`form-group ${isValid === false ? 'invalid' : contentUsername !== '' ? 'invalid' : ''}`}>
                    <label className="form-label">Tài khoản</label>
                    <input id="username" name="username" type="text" value={username} placeholder="Nhập tài khoản" className="form-control" onChange={(e) => setUsername(e.target.value)}/>
                    <span className="form-message">{content !== '' ? content : contentUsername}</span>
                </div>
            
                <div className={`form-group ${isValid === false ? 'invalid' : contentPassword !== '' ? 'invalid' : ''}`}>
                    <label className="form-label">Mật khẩu</label>
                    <input id="password" name="password" type="password" value={password} placeholder="Nhập mật khẩu" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
                    <span className="form-message">{content !== '' ? content : contentPassword}</span>
                </div>


                <button className="form-submit" onClick={checkLogin}>Đăng nhập</button>
            </form>
        </div>
    )
}

export default LoginPage;