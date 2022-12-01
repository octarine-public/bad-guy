import { EntityX, GameSleeperX, HeroX } from "github.com/octarine-private/immortal-core/index"
import { GameState } from "github.com/octarine-public/wrapper/index"

import { MenuManager } from "./Menu"

export class MainManager {
	protected MyHero: Nullable<HeroX>
	protected readonly Sleeper = new GameSleeperX()

	constructor(protected readonly menu: MenuManager) {}

	public OnTick(_dt: number) {
		if (!this.menu.State || this.MyHero === undefined) {
			return
		}

		this.AutoLaugh()
		this.AutoTaunt()
	}

	public OnGameEnded() {
		this.Sleeper.FullReset()
	}

	public OnGameStarted() {
		this.Sleeper.FullReset()
	}

	public OnEntityCreated(entity: EntityX) {
		if (entity instanceof HeroX && entity.IsMyHero) {
			this.MyHero = entity
		}
	}

	public OnEntityDestroyed(entity: EntityX) {
		if (this.MyHero?.Equals(entity)) {
			this.MyHero = undefined
		}
	}

	protected AutoLaugh() {
		if (this.menu.AutoLaugh && !this.Sleeper.Sleeping("AutoLaugh")) {
			GameState.ExecuteCommand("say /laugh")
			this.Sleeper.Sleep(this.menu.LaughDelay, "AutoLaugh")
		}
	}

	protected AutoTaunt() {
		if (this.menu.AutoTaunt && !this.Sleeper.Sleeping("AutoTaunt")) {
			GameState.ExecuteCommand("use_item_client current_hero taunt")
			this.Sleeper.Sleep(this.menu.LaughDelay, "AutoTaunt")
		}
	}
}
