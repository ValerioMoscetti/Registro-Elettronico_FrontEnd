import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"



const datiStudente = [
  {
    id: "1",
    cognome: "Rossi",
    nome: "mario",
    voti: [
      2, 10, 4, 8
    ]
  }
]

const dettaglioStudente = (id: string) => {

  //far andare alla pagina del dettaglio
}



export function VisualizzaVotiInsegnante() {





  return (
    <div className="flex justify-center py-8">
      <div className="w-full max-w-3xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Cognome</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead className="text-right">Media voti</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {datiStudente.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.cognome}</TableCell>
                <TableCell>{s.nome}</TableCell>
                <TableCell className="text-right" onClick={() => dettaglioStudente(s.id)}>
                  {(s.voti.reduce((a, c) => a + c, 0) / s.voti.length).toFixed(1)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>

  )
}