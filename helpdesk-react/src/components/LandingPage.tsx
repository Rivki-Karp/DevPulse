import { Box, Typography, Button, Container, Stack, Paper, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SpeedIcon from '@mui/icons-material/Speed';
import HubIcon from '@mui/icons-material/Hub';
import CodeIcon from '@mui/icons-material/Code';
import ButtonsByRole from "./ButtonsByRole";

function LandingPage() {
    const theme = useTheme();

    return (

        <>
            <ButtonsByRole/>
            <Box sx={{ bgcolor: 'background.default', color: 'text.primary' }}>

                <Box sx={{
                    pt: { xs: 8, md: 12 },
                    pb: { xs: 6, md: 8 },
                    background: `radial-gradient(circle at 50% -10%, ${theme.palette.primary.main}15 0%, rgba(5, 10, 16, 0) 40%)`
                }}>
                    <Container maxWidth="lg">
                        <Stack spacing={3} alignItems="center" textAlign="center">
                            <Box sx={{
                                px: 1.5, py: 0.5,
                                bgcolor: 'rgba(0, 255, 163, 0.05)',
                                borderRadius: 1,
                                border: '1px solid rgba(0, 255, 163, 0.2)'
                            }}>
                                <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 1.2 }}>
                                    THE NEW STANDARD FOR DEVS
                                </Typography>
                            </Box>

                            <Typography variant="h2" sx={{
                                fontSize: { xs: '2.5rem', md: '4rem' },
                                fontWeight: 900,
                                letterSpacing: '-0.01em',
                                lineHeight: 1.1,
                                background: '#00ffa3',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                DevPulse: Where Code Meets Connectivity.
                            </Typography>

                            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '750px', fontWeight: 400, fontSize: { xs: '1rem', md: '1.15rem' }, lineHeight: 1.6 }}>
                                DevPulse isn't just another management tool. It's the immune system of your project.
                                We built the workspace you've been waiting for—fast, clean, and remarkably intelligent.
                            </Typography>

                            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                                <Button component={Link} to="/register" variant="contained" size="large" sx={{ px: 4, py: 1.2, fontWeight: 700 }}>
                                    Get Started Now
                                </Button>
                                <Button component={Link} to="/login" variant="outlined" size="large" sx={{ px: 4, py: 1.2, color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}>
                                    Live Demo
                                </Button>
                            </Stack>
                        </Stack>
                    </Container>
                </Box>

                <Container maxWidth="md" sx={{ py: 6 }}>
                    <Stack spacing={2} alignItems="center" textAlign="center">
                        <Typography variant="h4" sx={{ fontWeight: 800 }}>
                            Tired of Managed Chaos?
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.1rem', color: 'text.secondary', lineHeight: 1.7 }}>
                            In modern development, tickets often turn into white noise. Engineers get lost in requirements,
                            and PMs lose control. DevPulse bridges that gap, ensuring your production pulse stays steady
                            and your deployments remain frequent.
                        </Typography>
                    </Stack>
                </Container>

                <Box sx={{ py: 6 }}>
                    <Container maxWidth="lg">
                        <Stack spacing={10}>

                            <Stack direction={{ xs: 'column', md: 'row' }} spacing={6} alignItems="center">
                                <Box sx={{ flex: 1 }}>
                                    <SpeedIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1.5 }} />
                                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5 }}>Zero-Friction Workflow</Typography>
                                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                        While other systems bury you in endless forms, DevPulse keeps it seamless.
                                        A UI optimized for speed, allowing you to focus on what truly matters: **The Code.**
                                    </Typography>
                                </Box>
                                <Paper sx={{ flex: 1, p: 3, bgcolor: '#0d1620', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 2 }}>
                                    <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#00ffa3', display: 'block', mb: 1 }}>// Efficiency Log</Typography>
                                    <Typography variant="body2" sx={{ fontFamily: 'monospace', color: '#7d8590' }}>
                                        {`{ \n  "action": "optimize_workflow",\n  "status": "active",\n  "impact": "high"\n}`}
                                    </Typography>
                                </Paper>
                            </Stack>

                            <Stack direction={{ xs: 'column', md: 'row-reverse' }} spacing={6} alignItems="center">
                                <Box sx={{ flex: 1 }}>
                                    <HubIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 1.5 }} />
                                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5 }}>Insightful Monitoring</Typography>
                                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                        We believe in transparency. Use our intelligent Dashboard to monitor your project's pulse in real-time.
                                        Identify bottlenecks and visualize team velocity at a glance.
                                    </Typography>
                                </Box>
                                <Box sx={{ flex: 1, textAlign: 'center' }}>
                                    <Box sx={{
                                        width: 120, height: 120, borderRadius: '50%',
                                        border: '3px solid #00ffa3', display: 'inline-flex',
                                        alignItems: 'center', justifyContent: 'center',
                                        boxShadow: '0 0 20px rgba(0,255,163,0.1)'
                                    }}>
                                        <Typography variant="h4" sx={{ fontWeight: 900 }}>99%</Typography>
                                    </Box>
                                    <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary', fontWeight: 600 }}>SYSTEM RELIABILITY</Typography>
                                </Box>
                            </Stack>

                            <Stack direction={{ xs: 'column', md: 'row' }} spacing={6} alignItems="center">
                                <Box sx={{ flex: 1 }}>
                                    <CodeIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1.5 }} />
                                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5 }}>Built for Developers</Typography>
                                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                        Designed with an engineer's mindset. Native Dark Mode, minimalist design to prevent distractions,
                                        and a robust architecture that keeps your data secure and accessible.
                                    </Typography>
                                </Box>
                                <Paper sx={{ flex: 1, p: 2, bgcolor: '#050a10', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <Typography variant="body2" sx={{ fontFamily: 'monospace', color: '#00ffa3' }}>
                                        $ devpulse login --success <br />
                                        $ fetch_tickets ... OK! <br />
                                        $ resolve_bugs --all <br />
                                    </Typography>
                                </Paper>
                            </Stack>

                        </Stack>
                    </Container>
                </Box>

                <Box sx={{ py: 10, textAlign: 'center', background: 'linear-gradient(180deg, rgba(5,10,16,0) 0%, rgba(0,255,163,0.03) 100%)' }}>
                    <Container maxWidth="sm">
                        <RocketLaunchIcon sx={{ fontSize: 48, mb: 2, color: 'primary.main' }} />
                        <Typography variant="h4" sx={{ fontWeight: 900, mb: 2 }}>Ready to regain control?</Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                            Join hundreds of developers who have optimized their delivery pipeline with DevPulse.
                        </Typography>
                        <Button component={Link} to="/register" variant="contained" size="large" sx={{ px: 6, py: 1.5, borderRadius: 2, fontWeight: 700 }}>
                            Start Your Journey
                        </Button>
                    </Container>
                </Box>
            </Box>
        </>
    );
}

export default LandingPage;