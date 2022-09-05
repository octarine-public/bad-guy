import { Color, Hero, RendererSDK, Unit } from "github.com/octarine-public/wrapper/wrapper/Imports"
import { filterUnits, Units } from "./Listeners"
import { DrawTextSize, SwitchUnit } from "./Menu"

function DrawText(unit: Unit) {
	if (!filterUnits(unit) || !unit.IsVisible || (SwitchUnit.selected_id !== 1 && !(unit instanceof Hero)))
		return
	const position_unit = RendererSDK.WorldToScreen(unit.Position)
	if (position_unit === undefined)
		return
	RendererSDK.Text("Feeding" + (unit.HasBuffByName("modifier_teleporting") ? ": teleporting..." : ""),
		position_unit, new Color(255, 255, 255), RendererSDK.DefaultFontName, DrawTextSize.value)
}
export function Renderer() {
	Units.forEach(DrawText)
}
