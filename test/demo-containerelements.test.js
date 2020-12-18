const React = require('react');
const {
  render,
  screen,
  fireEvent,
  waitFor,
} = require('@testing-library/react');
const { default: userEvent } = require('@testing-library/user-event');
const DemoContainerElements = require('../demo/js/component-examples/demo-containerelements');

describe('demo-container-elements', () => {
  it('ignores tabbing to child elements that are not specified in the containerElements option', async () => {
    render(<DemoContainerElements />);

    // Activate the focus trap
    fireEvent.click(screen.getByText('activate trap'));

    // Auto-sets focus inside the focus trap
    await waitFor(() => {
      expect(screen.getByText('with')).toHaveFocus();
    });

    // Tabbing forward through the focus trap and wrapping back to the beginning
    userEvent.tab();
    expect(screen.getByText('some')).toHaveFocus();

    userEvent.tab();
    expect(screen.getByText('focusable')).toHaveFocus();

    userEvent.tab();
    // Child elements NOT specified in the containerElements option get ignored
    expect(screen.getByText('something')).not.toHaveFocus();
    expect(screen.getByText('See')).toHaveFocus();

    userEvent.tab();
    expect(screen.getByText('how')).toHaveFocus();

    userEvent.tab();
    expect(screen.getByText('works')).toHaveFocus();

    userEvent.tab();
    // Child elements NOT specified in the containerElements option get ignored
    expect(screen.getByText('deactivate trap')).not.toHaveFocus();
    expect(screen.getByText('with')).toHaveFocus();

    // Tabbing backward through the focus trap and wrapping back to the beginning
    userEvent.tab({ shift: true });
    // Child elements NOT specified in the containerElements option get ignored
    expect(screen.getByText('deactivate trap')).not.toHaveFocus();
    expect(screen.getByText('works')).toHaveFocus();

    userEvent.tab({ shift: true });
    expect(screen.getByText('how')).toHaveFocus();

    userEvent.tab({ shift: true });
    expect(screen.getByText('See')).toHaveFocus();

    userEvent.tab({ shift: true });
    // Child elements NOT specified in the containerElements option get ignored
    expect(screen.getByText('something')).not.toHaveFocus();
    expect(screen.getByText('focusable')).toHaveFocus();

    userEvent.tab({ shift: true });
    expect(screen.getByText('some')).toHaveFocus();

    userEvent.tab({ shift: true });
    expect(screen.getByText('with')).toHaveFocus();
  });
});
