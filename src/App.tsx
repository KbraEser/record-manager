import { Container, Stack, Typography } from '@mui/material'
import { RecordForm } from './features/records/components/RecordForm'

function App() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
          Record Manager
        </Typography>
        <RecordForm />
      </Stack>
    </Container>
  )
}

export default App
