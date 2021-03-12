import { useMutation, useQuery } from "@apollo/client";
import { FC, KeyboardEvent, useRef } from "react";
import { ADD_TODO, GET_TODOS, Todo, UPDATE_TODO } from "../queries/queries";
import './Todos.css';
type Props = {
}
const Todos: FC<Props> = () => {

    const inputElement = useRef<HTMLInputElement>(null);

    const result = useQuery<{ todos: Todo[] }>(GET_TODOS);

    const [addTodo] = useMutation<Todo>(ADD_TODO);
    const [updateTodoMutation] = useMutation<Todo>(UPDATE_TODO);

    const submitTodo = async () => {
        await addTodo({ variables: { type: inputElement.current?.value } });
        result.refetch();
        inputElement.current!.value = '';
    };

    const updateTodo = async (todo: Pick<Todo, "id" | "type">) => {
        await updateTodoMutation({ variables: todo });
        result.refetch();
    };

    const deleteTodo = async (todo: Todo) => {
        await updateTodo({...todo, type: ''});
    };

    const submitOnEnter = (e: KeyboardEvent<HTMLInputElement>, callback: (args?: any) => void) => e.key === 'Enter' && callback();

    return <div>
        <input ref={inputElement} placeholder='Add Todo' onKeyDown={event => submitOnEnter(event, submitTodo)}></input>
        <div className="container">
            {result.data?.todos.filter(todo => todo.type).map(todo =>
                <div className="todo" key={todo.id}>
                    <input
                        defaultValue={todo.type}
                        onKeyDown={event => submitOnEnter(event, updateTodo.bind(this, { ...todo, type: (event.target as HTMLInputElement).value }))}></input>
                    <button onClick={deleteTodo.bind(this, todo)}>X</button></div>)}
        </div>
    </div>
}

export default Todos;