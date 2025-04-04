'use client';

import CreateCabinForm from '../_components/CreateCabinForm';
import { getCurrentUser } from '../_lib/data-service-admin';

function page() {
  async function getUser() {
    const user = await getCurrentUser();
    console.log(user);
  }

  return <div className="items-center">{<CreateCabinForm />}</div>;
}

export default page;
