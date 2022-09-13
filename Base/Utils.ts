import { GameState } from "github.com/octarine-public/wrapper/index"
export default class Base {
	public get GetDelayCast() {
		return (((GameState.Ping / 2) + 30) + 350)
	}
}
export let Utility = new Base()
