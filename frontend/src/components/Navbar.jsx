import React from 'react'
import { Flex, Box, Button, HStack, Text } from "@chakra-ui/react"
function Navbar() {
  return (
    <div>
      <nav className="sticky top-0 left-0 w-full z-50 bg-gray-800 p-4 text-white bg-white/5 backdrop-blur-md border-b-[1px] border-white/20">
          
          <Flex as="nav" px={6} py={3} align="center" justify="space-between">
 
            <Text fontWeight="bold" fontSize="lg">Health Ledger</Text>

            <HStack spacing={20} flex="1" justify="center">
              <Text>About</Text>
              <Text>Features</Text>
              <Text>Contact</Text>
            </HStack>

            <HStack spacing={4}>
              <Button variant="ghost">Login</Button>
              <Button colorScheme="blue">Signup</Button>
            </HStack>
          </Flex>

      </nav>

      <h1 className='text-gray-400'>Hello World</h1>
      

       

   




    </div>
  )
}

export default Navbar