import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server/index';
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
    }),
  ],
});

async function main() {
  let response = await trpc.signUp.mutate({
    email: "random@mail.com",
    password: "123321",
  })
  console.log(response)
}

main()
