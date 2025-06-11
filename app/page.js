import { redirect } from "next/navigation";
import { auth } from "./auth";
import { dbConnection } from "./utils/config/db";
import NavBar from "./components/NavBar";
import Adminpage from "./admin/page";

export default async function Home() {
  const session = await auth()
  await dbConnection()
  if(!session) {
    redirect('/login')
  }
  const userName = session.username;
  const role = session.role;
  console.log(userName)
  return (
    <div>
      {
        role === 'user' && (
          <>
            <NavBar userName={userName}/>
            <div className="container mx-auto px-4 py-4">
              <h1 className="text-xl text-blue-500">hello</h1>
            </div>
          </>
        )
      }
      {
        role === 'admin' && (
          <>
            <Adminpage userName={userName}/>
          </>
        )
      }
    </div>
  );
}
