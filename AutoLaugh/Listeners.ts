import { GameRules, GameState, LocalPlayer } from "github.com/octarine-public/wrapper/index"
import { Interval, State } from "./Menu"
let Sleep = 0
export function Tick() {
	if (!State.value || LocalPlayer!.Hero === undefined)
		return

	const Timer = GameRules?.RawGameTime ?? 0
	if (Timer >= Sleep && LocalPlayer!.Hero.IsAlive) {
		GameState.ExecuteCommand("say /laugh")
		Sleep = Timer + Interval.value
	}
}

export function GameEnded() {
	Sleep = 0
}
