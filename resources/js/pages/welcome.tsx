import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <div>
                        <h2 className="font-semibold">
                            City Government of Angeles
                        </h2>
                        <p className="text-xs text-gray-500">
                            Traffic Development Office
                        </p>
                    </div>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col gap-6 lg:max-w-5xl lg:flex-row">
                        {/* LEFT CONTENT */}
                        <div className="flex-1 rounded-lg bg-white p-6 shadow lg:p-12 dark:bg-[#161615]">
                            <h1 className="mb-2 text-2xl font-semibold dark:text-amber-50">
                                Angeles City Traffic Development Office
                            </h1>

                            <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
                                Official digital portal for traffic updates,
                                road advisories, and transportation management
                                in Angeles City.
                            </p>

                            <div className="space-y-3">
                                <div className="rounded border p-4 dark:border-gray-700 dark:text-amber-50">
                                    🚦 Real-time traffic advisories
                                </div>
                                <div className="rounded border p-4 dark:border-gray-700 dark:text-amber-50">
                                    🚓 Traffic enforcement updates
                                </div>
                                <div className="rounded border p-4 dark:border-gray-700 dark:text-amber-50">
                                    📢 Public announcements & road closures
                                </div>
                            </div>

                            <div className="mt-6 flex gap-3">
                                {auth.user ? (
                                    <Link
                                        href={dashboard()}
                                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={login()}
                                            className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                        >
                                            Log in
                                        </Link>
                                        {canRegister && (
                                            <Link
                                                href={register()}
                                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                            >
                                                Register
                                            </Link>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        {/* RIGHT CONTENT – FACEBOOK EMBED */}
                        <div className="w-full overflow-hidden rounded-lg border lg:w-[420px] dark:border-gray-700">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRejdKaLuLvw85NhgDqNl-yIghBSmCBm3AVOA&s"
                                alt="Angeles City Traffic Development Office"
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
