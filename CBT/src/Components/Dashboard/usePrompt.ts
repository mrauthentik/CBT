// usePrompt.tsx
import { useContext, useEffect } from "react";
import {
  UNSAFE_NavigationContext as NavigationContext,
  Navigator
} from "react-router-dom";

interface NavigationTransaction {
    retry: () => void;
}

function useBlocker(blocker: (tx: NavigationTransaction)=>void, when = true) {
  const navigator = useContext(NavigationContext).navigator as Navigator;

  useEffect(() => {
    if (!when) return;

    const unblock = navigator.block((tx: NavigationTransaction) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        }
      };
      blocker(autoUnblockingTx);
    });

    return unblock;
  }, [navigator, blocker, when]);
}

export function usePrompt(message: string, when = true) {
  const blocker = (tx: NavigationTransaction) => {
    if (window.confirm(message)) {
      tx.retry();
    }
  };

  useBlocker(blocker, when);
}
