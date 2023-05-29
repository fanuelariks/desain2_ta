import "../styles/globals.css";
import Sidebar from "../components/Sidebar";
import AuthStateChangeProvider from "../context/auth";
import { UserProvider } from "../context/user";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
library.add(faEye, faEyeSlash)

export default function App({ Component, pageProps, ...appProps }) {
  if (["/","/registrasi"].includes(appProps.router.pathname))
    return (
      <div>
        <UserProvider>
          <AuthStateChangeProvider>
            <Component {...pageProps} />
          </AuthStateChangeProvider>
        </UserProvider>
      </div>
    );

  // const {user, loading} = useUser()
  // const router = useRouter();
  // useEffect(() => {
  //   if(!(user||loading)) {
  //     router.push('/login')
  //   }
  // }, [user, loading])

  return (
    <Sidebar>
      <UserProvider>
        <AuthStateChangeProvider>
          <Component {...pageProps} />
        </AuthStateChangeProvider>
      </UserProvider>
    </Sidebar>
  );
}
