import { api } from "~/trpc/server";

export default async function Home() {
    const users:{score:number, name:string | null}[] = await api.leaderboard.getTopUsers();
    const listItems = users.map((user, index) =>
        <li className="text-purple-500" key={index ?? "TestUser"}> {index + 1}. {user.name} - {user.score}</li>
      );
      
    return (
        <main className="items-center">  
            <div className="h-20"/>
            <div className="w-1/2 p-4 mx-auto text-center">
                <h1>Leaderboard</h1>
                <p>Here is the leaderboard</p>
            </div>
            <div className="h-20 w-1/2 mx-auto text-center">
                <h2 className="text-red-700	font-bold font-mono">Top 5 Users - {users[0]?.name} is in the lead 👌! with {users[0]?.score} points!!!</h2>
                <ul> {listItems} </ul>
            </div>
        </main>
    );
}