import { Menu, MenuBase } from "../Base/MenuBase"
const { BaseTree, State } = MenuBase(Menu, "Auto Spinner")

const SpinnerKey = BaseTree.AddKeybind("Key"),
	ModeSpinner = BaseTree.AddDropdown("Mode", ["One place", "Circle"], 0),
	ControllablesMode = BaseTree.AddDropdown("Controllables", ["Local hero", "All controllables", "Courier only"], 0)

export {
	State,
	BaseTree,
	ModeSpinner,
	SpinnerKey,
	ControllablesMode,
}
