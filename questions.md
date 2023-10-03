1. What is the difference between Component and PureComponent? Give an example where it might break my app.

- Difference between Component and PureComponent is that PureComponent does a shallow comparison on state change. It basically means it compares their values if values that are compared scalar, or it compares their references if it is comparing objects. It might brake the app we try to mutate array or object directly in our state or props.

2. Context + ShouldComponentUpdate might be dangerous. Why is that?

- Context + ShouldComponentUpdate can be dangerous because ShouldComponentUpdate is used for comparisons of props and states, and unfortunately not the Context. This behaviour can cause missed re-renders.

3. Describe 3 ways to pass information from a component to its PARENT.

- Using Context
- By passing setState method as prop to child component
- Using Custom Events

4. Give 2 ways to prevent components from re-rendering.

- by using shouldComponentUpdate if we are using class components
- by using React.memo() for functional components

5. What is a fragment and why do we need it? Give an example where it might
   break my app.

- I usually use fragment if I want to group multiple elements without using extra DOM nodes, this way code is cleaner and also performance is better.

6. Give 3 examples of the HOC pattern.

- Authentication HOC
- Data Fetching HOC
- Styling HOC

7. What's the difference in handling exceptions in promises, callbacks
   and async...await?

- When using promises we can use .catch() method somewhere in the chain. If error happens, it will be caught by closest .catch() method in the chain.
- When using callback, we should usually put exception as the first argument of a function. After that we can decide what we can do with that exception.
- In async...await we handle exceptions by using try and catch blocks.

8. How many arguments does setState take and why is it async.

- setState takes two arguments. First one is required and it represents a new state or a function that returns a new state. The second one is optional and it is a callback that is executed after component re-renders. Not sure why it is async exactly, I heard it has to do something with performance optimization.

9. List the steps needed to migrate a Class to Function Component.

- create a new functional component with the appropriate name.
- move props and state logic.
- update event handlers.
- replace lifecycle methods with useEffect hook.
- remove this references.
- migrate context if necessary.
- optimize using hooks like useCallback and useMemo.
- test and debug.

10. List a few ways styles can be used with components.

- I usually use a CSS preprocessor like SASS, other ways are using: inline styles, CSS modules, Styled-components...

11. How to render an HTML string coming from the server.

- Most of the time I would use dangerouslySetInnerHTML prop even tho I know it is not the best way to do it as that HTML context might have some dangerous content.
