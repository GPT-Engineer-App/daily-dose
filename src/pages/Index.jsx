import React, { useState } from "react";
import { ChakraProvider, Box, VStack, HStack, Heading, IconButton, Input, Button, List, ListItem, ListIcon, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const addTodo = () => {
    if (!inputValue.trim()) {
      toast({
        title: "No content",
        description: "Todo can't be empty",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setTodos([...todos, { id: Date.now(), content: inputValue }]);
    setInputValue("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTodo();
    }
  };

  return (
    <ChakraProvider>
      <Box maxWidth="md" mx="auto" mt={10}>
        <VStack spacing={8}>
          <Heading>Todo App</Heading>
          <HStack width="full">
            <Input value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPress} placeholder="Add a new task..." />
            <IconButton colorScheme="blue" aria-label="Add todo" icon={<FaPlus />} onClick={addTodo} />
          </HStack>
          <List width="full">
            {todos.map((todo) => (
              <ListItem key={todo.id} paddingY={2} display="flex" alignItems="center" justifyContent="space-between">
                <HStack spacing={4}>
                  <ListIcon as={FaPlus} color="green.500" />
                  {todo.content}
                </HStack>
                <IconButton size="sm" colorScheme="red" aria-label="Delete todo" icon={<FaTrash />} onClick={() => deleteTodo(todo.id)} />
              </ListItem>
            ))}
          </List>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
