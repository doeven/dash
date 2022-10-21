
import { extendTheme } from "@chakra-ui/react"

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
  colors: {
    fine: '#C00' },
}


const theme = extendTheme({ config })

export default theme