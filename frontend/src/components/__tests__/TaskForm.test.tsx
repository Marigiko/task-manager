import { render, screen } from "@testing-library/react";
import TaskForm from "../TaskForm";

test("renderiza inputs del formulario", () => {
    render(<TaskForm onCreate={() => { }} />);
    expect(screen.getByLabelText(/título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descripción/i)).toBeInTheDocument();
});
