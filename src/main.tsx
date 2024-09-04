import 'systemjs'
import './index.css'

import {StrictMode, useEffect} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'

let microFrontendPromise: Promise<void | System.Module> | null = null;
export type MicroFe = {
    mount: (containerId: string) => void,
    unmount: (containerId: string) => void,
};
export const loadMicroFrontend = async (): Promise<MicroFe | undefined> => {
    if (!microFrontendPromise) {
        microFrontendPromise = System.import("/vendor/mf-header.min.js")
            .then((module: System.Module) => {
                return {...module}

            })
            .catch((err): void => {
                microFrontendPromise = null;
                throw err
            });
    }

    return microFrontendPromise as Promise<MicroFe>
};

export type MicroFrontendProps = {
    containerId: string,
};

export default function MicroFrontend({containerId}: MicroFrontendProps) {
    useEffect(() => {
        let microFe: MicroFe | undefined;
        const loader = async () => {
            microFe = await loadMicroFrontend();
            if (microFe) {
                microFe.mount(containerId)
            }
        };
        loader()

        return () => microFe && microFe.unmount(containerId);
    }, [containerId]);

    return <div id={containerId}/>;
}

const root = createRoot(document.getElementById('root')!)

root.render(
    <StrictMode>
        <MicroFrontend containerId="mf-header" />
        <App/>
    </StrictMode>,
)