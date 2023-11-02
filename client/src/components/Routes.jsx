import {Route, Routes} from 'react-router-dom';

import About from '../pages/About';
import CreateListing from '../pages/CreateListing';
import Home from '../pages/Home';
import Listing from '../pages/Listing';
import Loading from './Loading';
import { LoginCallback } from '@okta/okta-react';
import PrivateRoute from './SecureRoute';
import Profile from '../pages/Profile';
import React from 'react';
import Search from '../pages/Search';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import UpdateListing from '../pages/UpdateListing';

const AppRoutes = () => {
  return (
    <Routes>
    <Route path='/' exact={true} element={<Home />} />
    <Route path="login/callback" element={<LoginCallback loadingElement={<Loading/>}/>}/>

    <Route path='/sign-in' element={<SignIn />} />
    <Route path='/sign-up' element={<SignUp />} />
    <Route path='/about' element={<About />} />
    <Route path='/search' element={<Search />} />
    <Route path='/listing/:listingId' element={<Listing />} />

    <Route element={<PrivateRoute />}>
      <Route path='/profile' element={<Profile />} />
      <Route path='/create-listing' element={<CreateListing />} />
      <Route
        path='/update-listing/:listingId'
        element={<UpdateListing />}
      />
    </Route>
  </Routes>
  );
};

export default AppRoutes;
