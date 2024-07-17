import { CircleBackslashIcon, EyeClosedIcon, SewingPinFilledIcon } from '@radix-ui/react-icons'
import { getSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const SaaSProviderPage = () => {
  const session = getSession()

  if(!session) {
    return redirect('/')
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-800 text-white">
      <h1 className="text-2xl font-bold mt-4">Esta página é do provedor do SaaS</h1>

      <CircleBackslashIcon className="w-10 h-10 mt-10" />
    </div>
  );
};

export default SaaSProviderPage;
