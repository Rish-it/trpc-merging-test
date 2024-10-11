import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server/index';
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
      async headers(){
        return{
          Authoriztion:"Bearer 1"
        }
      }
    }),
  ],
});

async function main() {
  let response = await trpc.createTodo.mutate({
    title: "trpc headers",
    description: "header---header----head",
  })
  console.log(response)
}

main()
