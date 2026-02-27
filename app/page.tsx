"use client"

import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { ModeToggle } from "@/components/mode-toggle"
import { Wallet } from "lucide-react"

const FREQUENCY_OPTIONS = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
]

export default function NetWorthCalculator() {
  const [income, setIncome] = React.useState<string>("")
  const [frequency, setFrequency] = React.useState<string>("monthly")
  const [currency, setCurrency] = React.useState<string>("EUR")
  const [returnRate, setReturnRate] = React.useState<number[]>([4])

  const calculateNetWorth = (): number | null => {
    const incomeValue = parseFloat(income)
    const currentRate = returnRate[0]

    if (isNaN(incomeValue) || incomeValue <= 0 || currentRate <= 0) {
      return null
    }

    const annualIncome = frequency === "monthly" ? incomeValue * 12 : incomeValue
    const requiredNetWorth = annualIncome / (currentRate / 100)

    return requiredNetWorth
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const netWorth = calculateNetWorth()

  const getRateDescription = (rate: number): string => {
    if (rate <= 3) return "Conservative"
    if (rate <= 5) return "Moderate"
    if (rate <= 7) return "Aggressive"
    return "Very Aggressive"
  }

  const selectedFrequencyLabel = FREQUENCY_OPTIONS.find(opt => opt.value === frequency)?.label || "Monthly"

  return (
    <div className="min-h-screen bg-slate-50 p-4 dark:bg-black">
      <div className="mx-auto max-w-md pt-12">
        <Card className="shadow-lg">
          <CardHeader className="text-center relative">
            <div className="absolute right-0 top-0">
              <ModeToggle />
            </div>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Wallet className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Passive Income Calculator</CardTitle>
            <CardDescription>
              Calculate how much you need to invest to achieve your desired passive income
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup className="gap-6">
              <Field>
                <FieldLabel htmlFor="income">Desired Income</FieldLabel>
                <div className="flex gap-2">
                  <Input
                    id="income"
                    type="number"
                    placeholder="2500"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    step={100}
                    className="flex-1"
                  />
                  <Select value={currency} onValueChange={(value) => value && setCurrency(value)}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="JPY">JPY</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Select value={frequency} onValueChange={(value) => value && setFrequency(value)}>
                    <SelectTrigger className="w-24">
                      <SelectValue>{selectedFrequencyLabel}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {FREQUENCY_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </Field>

              <Field>
                <FieldLabel>Expected Annual Return</FieldLabel>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground text-sm">
                    {returnRate[0].toFixed(1)}%
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {getRateDescription(returnRate[0])}
                  </Badge>
                </div>
                <Slider
                  defaultValue={[4]}
                  onValueChange={(value) => {
                    const numValue = Array.isArray(value) ? value[0] : value
                    if (typeof numValue === 'number' && !isNaN(numValue)) {
                      setReturnRate([numValue])
                    }
                  }}
                  min={2}
                  max={8}
                  step={1}
                  className="w-full"
                />
              </Field>

              <Separator />

              <div className="rounded-lg bg-muted p-4 text-center">
                <p className="text-muted-foreground mb-1 text-sm">
                  Required Net Worth
                </p>
                {netWorth !== null ? (
                  <div className="space-y-2">
                    <p className="text-3xl font-bold text-primary">
                      {formatCurrency(netWorth)}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      Based on {returnRate[0]}% annual return
                    </Badge>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-lg">
                    Enter values to see result
                  </p>
                )}
              </div>

              {netWorth !== null && (
                <div className="text-muted-foreground space-y-1 text-xs">
                  <p>
                    <strong>Calculation:</strong> Annual income of{" "}
                    {formatCurrency(
                      frequency === "monthly"
                        ? parseFloat(income || "0") * 12
                        : parseFloat(income || "0")
                    )}{" "}
                    ÷ {returnRate[0]}% = {formatCurrency(netWorth)}
                  </p>
                  <p>
                    This assumes a {returnRate[0]}% annual return on your investments.
                  </p>
                </div>
              )}
            </FieldGroup>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
