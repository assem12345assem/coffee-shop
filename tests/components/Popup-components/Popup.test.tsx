import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import BasePopup from '@/components/Popup-components/Popup';

describe('BasePopup Component', () => {
  jest.useFakeTimers();

  it('renders the popup with message', () => {
    render(<BasePopup message="Test Message" />);
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('renders with icon if provided', () => {
    render(<BasePopup message="With Icon" icon={<span>🔔</span>} />);
    expect(screen.getByText('🔔')).toBeInTheDocument();
  });

  it('auto-dismisses after the specified time', () => {
    render(<BasePopup message="Auto Dismiss" autoDismissMs={3000} />);
    expect(screen.getByText('Auto Dismiss')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.queryByText('Auto Dismiss')).not.toBeInTheDocument();
  });

  it('calls onClose when manually closed', () => {
    const onCloseMock = jest.fn();
    render(<BasePopup message="Closable" onClose={onCloseMock} />);

    fireEvent.click(screen.getByRole('button', { name: /close popup/i }));

    expect(onCloseMock).toHaveBeenCalled();
    expect(screen.queryByText('Closable')).not.toBeInTheDocument();
  });

  it('closes when clicking outside or pressing a key', () => {
    render(<BasePopup message="Close on Click" />);

    fireEvent.click(document.body);
    expect(screen.queryByText('Close on Click')).not.toBeInTheDocument();

    render(<BasePopup message="Close on Keydown" />);
    fireEvent.keyDown(document.body);
    expect(screen.queryByText('Close on Keydown')).not.toBeInTheDocument();
  });
});
