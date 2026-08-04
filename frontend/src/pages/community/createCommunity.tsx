import { useUser } from "@clerk/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const CreateCommunityPage = () => {
  const navigate = useNavigate()

  const [imageFile, setImageFile] = useState<File | null>(null)

  const { user, isLoaded } = useUser()

  useEffect(() => {
    if (!user && isLoaded) {
      navigate('/communities')
    }
  }, [user, isLoaded, navigate])


  return (
    <div>

    </div>
  )
}
