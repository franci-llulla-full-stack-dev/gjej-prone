import React from 'react';
import { Link } from '@inertiajs/react';

const Terms = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-6">Termat dhe Kushtet</h1>

            <p className="mb-4">
                Mirësevini në platformën tonë për shërbime auto. Duke përdorur këtë platformë,
                ju pranoni këto Terma dhe Kushtet e përdorimit.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">1. Llogaria e Përdoruesit</h2>
            <p className="mb-4">
                Ju duhet të jeni të moshës së ligjshme për të krijuar një llogari.
                Ju pranoni të siguroni informacione të sakta dhe të përditësuara gjatë regjistrimit.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">2. Siguria e Llogarisë</h2>
            <p className="mb-4">
                Ju jeni përgjegjës për mbajtjen e fjalëkalimit tuaj të sigurt dhe për çdo aktivitet të kryer në llogarinë tuaj.
                Nuk jemi përgjegjës për përdorim të paautorizuar nëse informacioni juaj nuk mbahet i sigurt.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">3. Përdorimi i Platformës</h2>
            <p className="mb-4">
                Ju pranoni të përdorni platformën vetëm për qëllime ligjore dhe të shmangni çdo veprim të paligjshëm, përfshirë spamming,
                piraterinë, ose sulmet ndaj sistemit.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">4. Privatësia dhe të Dhënat</h2>
            <p className="mb-4">
                Të dhënat tuaja personale përdoren vetëm për ofrimin e shërbimeve tona.
                Ju mund të lexoni më shumë në <Link href="/privacy" className="text-blue-600 underline">Politikën e Privatësisë</Link>.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">5. Pronësia Intelektuale</h2>
            <p className="mb-4">
                Të gjitha të drejtat mbi markat, logot dhe materialet e platformës janë pronë e kompanisë sonë.
                Nuk lejohet kopjimi ose shpërndarja pa leje.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">6. Përgjegjësia</h2>
            <p className="mb-4">
                Platforma ofrohet "as is". Nuk jemi përgjegjës për dëme të drejtpërdrejta apo indirekte që mund të ndodhin nga përdorimi i saj.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">7. Ndërprerja e Llogarisë</h2>
            <p className="mb-4">
                Ne mund të pezullojmë ose fshijmë llogaritë që shkelin këto Terma dhe Kushtet pa paralajmërim paraprak.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">8. Ndryshimet në Termat dhe Kushtet</h2>
            <p className="mb-4">
                Ne mund të ndryshojmë këto Terma dhe Kushtet në çdo kohë. Përdoruesit duhet të kontrollojnë këtë faqe periodikisht për ndryshime.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">9. Ligji dhe Juridiksioni</h2>
            <p className="mb-4">
                Këto Terma dhe Kushtet rregullohen nga ligjet e Republikës së Shqipërisë. Çdo mosmarrëveshje do të zgjidhet në gjykatat përkatëse në Shqipëri.
            </p>


        </div>
    );
};

export default Terms;
