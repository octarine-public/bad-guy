import { Menu } from "github.com/octarine-public/wrapper/index"

export default class MenuManager {

	protected readonly Menu: Menu.Node
	protected readonly IState: Menu.Toggle
	protected readonly Entries: Menu.Node

	protected readonly AutoLaughTree: Menu.Node
	protected readonly IAutoLaughState: Menu.Toggle
	protected readonly IAutoLaughDelay: Menu.Slider

	protected readonly AutoTauntTree: Menu.Node
	protected readonly IAutoTauntState: Menu.Toggle
	protected readonly IAutoTauntDelay: Menu.Slider

	constructor() {

		this.Entries = Menu.AddEntry("Utility")
		this.Menu = this.Entries.AddNode("Bad Guy", "panorama/images/hud/reborn/icon_magic_resist_psd.vtex_c")
		this.IState = this.Menu.AddToggle("State")

		this.AutoLaughTree = this.Menu.AddNode("Auto Laugh")
		this.IAutoLaughState = this.AutoLaughTree.AddToggle("State")
		this.IAutoLaughDelay = this.AutoLaughTree.AddSlider("Delay (sec)", 15, 15, 300)

		this.AutoTauntTree = this.Menu.AddNode("Auto Taunt")
		this.IAutoTauntState = this.AutoTauntTree.AddToggle("State")
		this.IAutoTauntDelay = this.AutoTauntTree.AddSlider("Delay (sec)", 15, 1, 300)
	}

	public get State() {
		return this.IState.value
	}

	public get AutoTaunt() {
		return this.State
			&& this.IAutoTauntState.value
	}

	public get AutoLaugh() {
		return this.State
			&& this.IAutoLaughState.value
	}

	public get LaughDelay() {
		return this.IAutoLaughDelay.value
	}

	public get TauntDelay() {
		return this.IAutoTauntDelay.value
	}
}
