import React, { useState } from 'react';
import Header from '../../components/UserComponents/Layouts/Header';
import DisplayProfile from '../../components/UserComponents/profile/DisplayProfile';
import { Loader } from '../../components/Constans/Loader/Loader'; 

function Profile() {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      {loading && <Loader />}
      <Header />
      <DisplayProfile onLoad={() => setLoading(true)} />
    </div>
  );
}

export default Profile;
