import { Form, useActionData, redirect } from "react-router";
import { useState } from "react";
import { AdminSession } from "../../lib/admin-auth";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  
  if (AdminSession.login(username, password)) {
    return redirect("/admin/dashboard");
  }
  
  return { error: "Invalid credentials. Please try again." };
}

export default function AdminLogin() {
  const actionData = useActionData() as { error?: string } | undefined;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-blue-50 to-royal-gold-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-royal-blue-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-royal-blue-700 mb-2">Admin Portal</h1>
          <p className="text-royal-silver-600">Sign in to manage products</p>
        </div>
        
        <Form method="post" className="space-y-6">
          {actionData?.error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {actionData.error}
            </div>
          )}
          
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-royal-silver-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="w-full px-4 py-3 border border-royal-silver-300 rounded-lg focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500 transition-all"
              placeholder="Enter username"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-royal-silver-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-4 py-3 border border-royal-silver-300 rounded-lg focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500 transition-all"
              placeholder="Enter password"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-royal-blue-500 hover:bg-royal-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Sign In
          </button>
        </Form>
        
        <div className="mt-6 text-center text-sm text-royal-silver-500">
          <p>Demo Credentials:</p>
          <p>Username: admin</p>
          <p>Password: royalhood123</p>
        </div>
      </div>
    </div>
  );
}