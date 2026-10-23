import { fireEvent, render, screen } from "@testing-library/react";
import Textform from "./Textform";

test("converts text to uppercase and reports the action", () => {
  const showAlert = jest.fn();
  render(<Textform heading="Text analysis" Mode="light" showAlert={showAlert} />);

  const input = screen.getByRole("textbox", { name: /example text area/i });
  fireEvent.change(input, { target: { value: "Hello World" } });
  fireEvent.click(screen.getByRole("button", { name: /convert to upper case/i }));

  expect(input).toHaveValue("HELLO WORLD");
  expect(showAlert).toHaveBeenCalledWith("Text Updated to the UpperCase", "success");
});
