import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import router from './routes/Router';
import CustomCursor from './components/CustomCursor';
import { isFirebaseConfigured } from './firebase/firebase.config';

function App() {
  return (
    <>
      <CustomCursor />
      <Toaster position="top-right" toastOptions={{ style: { background: '#171622', color: '#fff' } }} />
      {!isFirebaseConfigured && (
        <div className="bg-yellow-500 text-black text-sm text-center py-2 px-4 relative z-[100]">
          Setup needed: copy <code>client/.env.example</code> to <code>client/.env</code>, fill in your Firebase + imgBB keys, then restart the dev server.
        </div>
      )}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
