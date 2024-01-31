"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,  
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { login } from "@/actions/login";

export const LoginForm = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Something went wrong!")
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError(false);

    startTransition(() => {
      login(values)
        .then((data) => {
          // nothing, redirection is handled by the signin function
          setError(false);
        }).catch((error) => {
          console.log(error);
          setErrorMessage(error?.message)
          setError(true)
        })
    })
  };

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center space-y-6"
      >
        <h3 className="text-xl font-bold text-white" >Login to your Account</h3>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg" >Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="john.doe@example.com"
                    type="email"
                    size={30}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg" >Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="******"
                    type="password"
                    size={30}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {error && (
          <div className="bg-red-400 text-black font-bold rounded-lg p-4 border border-red-600" >
            {errorMessage}
          </div>
        )}
        <Button
          disabled={isPending}
          type="submit"
          size="lg"
        >
          Login
        </Button>
      </form>
    </Form>
  );
};