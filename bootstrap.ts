import { EventsX } from "github.com/octarine-private/immortal-core/index"
import { EventsSDK } from "github.com/octarine-public/wrapper/index"
import MainManager from "./Manager/Main"
import MenuManager from "./Manager/Menu"

const IMenu = new MenuManager()
const IManager = new MainManager(IMenu)

EventsSDK.on("Tick", dt =>
	IManager.OnTick(dt))

EventsX.on("GameEnded", () =>
	IManager.OnGameEnded())

EventsX.on("GameStarted", () =>
	IManager.OnGameStarted())

EventsX.on("EntityCreated", entity =>
	IManager.OnEntityCreated(entity))

EventsX.on("EntityDestroyed", entity =>
	IManager.OnEntityDestroyed(entity))