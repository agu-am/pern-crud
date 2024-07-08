import { useAuth } from "../context/AuthContext.jsx"
import { Card } from "../components/ui"

function HomePage() {
  const data = useAuth()
  return (
    <Card>
      <h1 className="text-3xl font-bold my-4">Bienvenido - Home Page</h1>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem culpa, cum reiciendis labore, adipisci sapiente exercitationem quisquam deleniti odit quia soluta minus accusantium vero tempore molestiae, enim obcaecati quidem dolorum. Quas, qui consequuntur fugit ratione numquam ex commodi aspernatur cum.</p>
    </Card>
  )
}

export default HomePage