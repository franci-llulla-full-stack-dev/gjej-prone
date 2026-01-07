import React from 'react';
import { Link } from '@inertiajs/react';

const Privacy = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-6">Politika e Privatësisë</h1>

            <p className="mb-4">
                Ne respektojmë privatësinë tuaj dhe jemi të përkushtuar për të mbrojtur informacionin që na siguroni gjatë përdorimit të platformës tonë për shërbime auto.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">1. Informacioni që mbledhim</h2>
            <p className="mb-4">
                Mund të mbledhim informacionin tuaj personal si:
                <ul className="list-disc list-inside ml-5">
                    <li>Email dhe numër telefoni</li>
                    <li>Emri dhe mbiemri</li>
                    <li>Detaje të përdorimit të platformës</li>
                </ul>
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">2. Si përdorim informacionin tuaj</h2>
            <p className="mb-4">
                Të dhënat tuaja përdoren për:
                <ul className="list-disc list-inside ml-5">
                    <li>Ofrimin dhe menaxhimin e shërbimeve të rezervuara</li>
                    <li>Komunikimin me ju për konfirmime, njoftime ose mesazhe të rëndësishme</li>
                    <li>Analizimin dhe përmirësimin e shërbimeve tona</li>
                </ul>
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">3. Si ruajmë informacionin</h2>
            <p className="mb-4">
                Të dhënat ruhen në mënyrë të sigurt dhe të koduar. Vetëm punonjësit e autorizuar ose sistemet e sigurisë kanë qasje. Nuk i ndajmë të dhënat tuaja me palë të treta pa miratimin tuaj, përveç rasteve të ligjshme.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">4. Të drejtat e përdoruesve</h2>
            <p className="mb-4">
                Ju keni të drejtë të:
                <ul className="list-disc list-inside ml-5">
                    <li>Shikoni dhe përditësoni informacionin tuaj personal</li>
                    <li>Kërkoni fshirjen ose eksportimin e të dhënave tuaja</li>
                    <li>Tërhiqni pëlqimin për përdorimin e informacionit tuaj për marketing</li>
                </ul>
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">5. Cookies dhe teknologji të ngjashme</h2>
            <p className="mb-4">
                Përdorim cookies dhe teknologji të tjera për të përmirësuar funksionimin e platformës dhe për të analizuar trafikun. Ju mund të refuzoni cookies përveç atyre thelbësore.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">6. Siguria e informacionit</h2>
            <p className="mb-4">
                Ne përdorim masat më të mira të industrisë për të mbrojtur informacionin tuaj, përfshirë enkriptimin, kontrollet e aksesit dhe monitorimin e sistemeve.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">7. Ndryshimet në politikë</h2>
            <p className="mb-4">
                Ne mund të përditësojmë këtë Politikë të Privatësisë në çdo kohë. Ndryshimet do të publikohen në këtë faqe dhe është përgjegjësi e përdoruesit të kontrollojë ndryshimet periodikisht.
            </p>

            <p className="mt-6 text-sm text-gray-600">
                Kjo politikë hyn në fuqi që nga data e publikimit dhe zbatohet për të gjitha të dhënat që mbledhim nga përdoruesit e platformës.
            </p>
        </div>
    );
};

export default Privacy;
