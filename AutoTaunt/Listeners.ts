import { GameRules, GameState, LocalPlayer } from "github.com/octarine-public/wrapper/index"
import { Interval, State } from "./Menu"
let Sleep = 0
export function Tick() {
	if (!State.value || LocalPlayer!.Hero === undefined)
		return

	const Timer = GameRules!.RawGameTime ?? 0
	if (Timer >= Sleep && LocalPlayer!.Hero.IsAlive) {
		GameState.ExecuteCommand("use_item_client current_hero taunt")
		Sleep = Timer + Interval.value
	}
}
export function GameEnded() {
	Sleep = 0
}
