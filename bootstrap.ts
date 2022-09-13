
import { DOTAGameUIState_t, EventsSDK, GameRules, GameState, LocalPlayer } from "github.com/octarine-public/wrapper/index"
import * as AutoFeed from "./AutoFeed/Listeners"
import * as AutoLaugh from "./AutoLaugh/Listeners"
import * as AutoPinger from "./AutoPinger/Listeners"
import * as AutoSpinner from "./AutoSpinner/Listeners"
import * as AutoTaunt from "./AutoTaunt/Listeners"

import { MainState } from "./Base/MenuBase"

EventsSDK.on("Tick", () => {
	if (!MainState.value)
		return
	AutoFeed.Tick()
	AutoLaugh.Tick()
	AutoTaunt.Tick()
	AutoPinger.Tick()
	AutoSpinner.Tick()
})
EventsSDK.on("Draw", () => {
	if (
		!MainState.value
		|| LocalPlayer === undefined
		|| GameState.UIState !== DOTAGameUIState_t.DOTA_GAME_UI_DOTA_INGAME
		|| !GameRules?.IsInGame
	)
		return
	AutoFeed.Draw()
	AutoPinger.Draw()
})

EventsSDK.on("GameStarted", () => {
	AutoPinger.GameStarted()
})

EventsSDK.on("GameEnded", () => {
	AutoFeed.GameEnded()
	AutoTaunt.GameEnded()
	AutoLaugh.GameEnded()
	AutoPinger.GameEnded()
})

EventsSDK.on("EntityCreated", x => {
	AutoFeed.EntityCreate(x)
	AutoPinger.EntityCreated(x)
})

EventsSDK.on("EntityDestroyed", x => {
	AutoFeed.EntityDestroyed(x)
	AutoPinger.EntityDestroyed(x)
})
