import React from "react"
import { useMsal } from "@azure/msal-react"
function LogInDetails() {
  const { accounts } = useMsal()
  return (
    <>
      <p>Logged-in Email: {accounts[0]?.username}</p>
      <p> Username: {accounts[0]?.name}</p>
    </>
  )
}
export default LogInDetails

;
