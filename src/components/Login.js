import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { setAuthorizationToken } from 'helper/setAuthorizationToken';
import { post } from 'helper/api';
import { toast } from 'react-toastify';
const Login = () => {

  let history = useHistory();
  const [showPassword, setShowPassword] = useState(false)
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const { email, password } = login;
  const onInputChange = e => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (e) => {
    e.preventDefault()
    await post(`login`, { email: login.email, password: login.password })
      .then((res) => {
        if (res.data.success === true) {
          setLogin(res.data);
          toast.success(res.data.response)
          setAuthorizationToken(res.data.token)
          history.push("/admin");
        }
        else {
          toast.error(res.data.response)
        }
      })
      .catch(() => { });
  }
  return (
    <section class="h-100 gradient-form" style={{ "backgroundColor": "#eee" }}>
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-xl-10">
            <div class="card rounded-3 text-black">
              <div class="row g-0">
                <div class="col-lg-6">
                  <div class="card-body p-md-5 mx-md-4">

                    <div class="text-center">
                      <img src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/lotus.png" style={{ "width": "185px" }} alt="logo" />
                      <h4 class="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                    </div>

                    <form onSubmit={e => onSubmit(e)}>
                      <p>Please login to your account</p>

                      <div class="form-outline mb-4">
                        <input onChange={e => onInputChange(e)} name='email' value={email} type="email" id="form2Example11" class="form-control" placeholder="email address" />
                      </div>

                      <div class="form-outline mb-4">
                        <input onChange={e => onInputChange(e)} name="password" value={password} type={showPassword ? 'text' : 'password'} id="form2Example22" class="form-control" placeholder="password" />
                      </div>

                      <input onClick={handleShowPassword} type="checkbox" id="showPassword" />
                      <label for="showPassword" className="pl-2">Show password</label>

                      <div class="text-center pt-1 mb-5 pb-1">
                        <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Log in</button>
                      </div>
                    </form>

                  </div>
                </div>
                <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 class="mb-4">We are more than just a restaurant</h4>
                    <p class="small mb-0">A restaurant (sometimes known as a diner) is a place where cooked food is sold to the public, and where people sit down to eat it. It is also a place where people go to enjoy the time and to eat a meal. Some restaurants are a chain, meaning that there are restaurants which have the same name and serve the same food.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
