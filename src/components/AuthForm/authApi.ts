import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { User } from "../../types";

interface AuthResponse {
  user: User;
}

interface AuthCredentials {
  email: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, AuthCredentials>({
      async queryFn({ email, password }) {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          const token = await user.getIdToken();
          return {
            data: {
              user: {
                email: user.email,
                token,
                id: user.uid,
              },
            },
          };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          return { error: { status: "CUSTOM_ERROR", message: error.message } };
        }
      },
    }),

    register: builder.mutation<AuthResponse, AuthCredentials>({
      async queryFn({ email, password }) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          const token = await user.getIdToken();
          return {
            data: {
              user: {
                email: user.email,
                token,
                id: user.uid,
              },
            },
          };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          return { error: { status: "CUSTOM_ERROR", message: error.message } };
        }
      },
    }),

    logout: builder.mutation<void, void>({
      async queryFn() {
        try {
          await signOut(auth);
          return { data: undefined };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          return { error: { status: "CUSTOM_ERROR", message: error.message } };
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi;
