import React from 'react'
import { Flex, Box, Button, HStack, Text } from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate  = useNavigate();
  return (
    <div>
      <nav className="sticky top-0 left-0 w-full z-50 bg-gray-800 p-4 text-white bg-white/5 backdrop-blur-md border-b-[1px] border-white/20">
          
          <Flex as="nav" px={6} align="center" justify="space-between">
            <img src="/icon.png" alt="logo" style={{ height: '30px', width:'40px', marginRight:'5px', userSelect:'none'}}/>
           
            
            <Text fontWeight="bold" fontSize="lg">Health Ledger</Text>

            <HStack spacing={4} flex="1" justify="center">
              <Text>About</Text>
              <Text>Features</Text>
              <Text>Contact</Text>
            </HStack>

            <HStack spacing={4}>
               <Button
                  variant="outline"
                  borderColor="white"
                  color="white"
                  _hover={{ bg: "whiteAlpha.200" }}
                  onClick = {() => navigate('/login')}
                >
                  Login
                </Button>
              <Button colorScheme="blue" onClick={()=> navigate('/register')}>Register</Button>
            </HStack>
          </Flex>

      </nav>

    </div>
  )
}

export default Navbar


