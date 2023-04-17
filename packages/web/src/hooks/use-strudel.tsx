import { useWebTarget } from "@/hooks/use-web-target";
import type { Session } from "@flok-editor/session";
import { StrudelWrapper } from "@/lib/strudel-wrapper";

export function useStrudel(
  session: Session | null,
  onError?: (err: unknown) => void,
  onWarning?: (msg: string) => void
) {
  return useWebTarget<StrudelWrapper>(
    "strudel",
    session,
    async () => {
      console.log("Create StrudelWrapper");
      const strudel = new StrudelWrapper({ onError, onWarning });

      console.log("Import Strudel modules");
      await strudel.importModules();

      return strudel;
    },
    {
      onEval: (instance, { body }) => instance.tryEval(body),
      onError,
    }
  );
}
