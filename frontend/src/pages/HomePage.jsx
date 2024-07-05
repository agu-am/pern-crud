import { useAuth } from "../context/AuthContext.jsx"

function HomePage() {
  const data = useAuth()
  console.log(data)
  return (
    <div>HomePage</div>
  )
}

export default HomePage