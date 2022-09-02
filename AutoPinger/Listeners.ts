import { ArrayExtensions, Color, Entity, EntityManager, GameRules, GameState, Hero, LocalPlayer, MinimapSDK, PingType_t, Vector2, Vector3 } from "wrapper/Imports"
import { DebugPing, HeroesList, Interval_val, State } from "./Menu"
let Sleep = 0
let Heroes: Hero[] = []
let Pos = new Vector3()

export function Tick() {
	if (!State.value || LocalPlayer!.Hero === undefined)
		return
	const Timer = GameRules?.RawGameTime ?? 0
	Heroes.some(x => {
		if (x.IsEnemy() || x === LocalPlayer!.Hero)
			return false
		if (!HeroPing(x)) {
			if (DebugPing.value)
				Pos = new Vector3()
			return false
		}
		if (Timer <= Sleep)
			return false
		if (DebugPing.value) {
			Pos = x.Position
			GameState.ExecuteCommand("playvol ui/ping " + (1 / 200))
		}

		MinimapSDK.SendPing(Vector2.FromVector3(x.Position), PingType_t.NORMAL, false, x)
		Sleep = Timer + (Interval_val.value / 100)
		return true
	})
}

export function Draw() {
	if (!State.value || !DebugPing.value || Pos.IsZero())
		return
	const time = GameRules?.RawGameTime ?? 0
	const getInt = ConVars.Get("dota_minimap_ping_duration")
	MinimapSDK.DrawPing(Pos, Color.Green, time + (typeof getInt === "number" ? getInt : 3))
}

function HeroPing(hero: Hero) {
	if (hero === undefined)
		return false
	return HeroesList.enabled_values.get(hero.Name)
}

export function UpdateMenu() {
	HeroesList.values = EntityManager.GetEntitiesByClass(Hero)
		.filter(x => x !== LocalPlayer?.Hero && !x.IsEnemy())
		.map(z => z.Name)
	HeroesList.Update()
}

export function EntityCreated(x: Entity) {
	if (x instanceof Hero) {
		UpdateMenu()
		Heroes.push(x)
	}
}
export function EntityDestroyed(x: Entity) {
	if (x instanceof Hero) {
		UpdateMenu()
		ArrayExtensions.arrayRemove(Heroes, x)
	}
}

export function GameStarted() {
	HeroesList.enabled_values.forEach((_, key) => HeroesList.enabled_values.set(key, false))
}
export function GameEnded() {
	Sleep = 0
	Pos = new Vector3()
	Heroes = []
	HeroesList.enabled_values.forEach((_, key) => HeroesList.enabled_values.set(key, false))
	HeroesList.values = []
	HeroesList.Update()
}
